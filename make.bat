@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
SET NODE_PATH=%AppData%\npm\node_modules
SET PATH=C:\Program Files\nodejs\;%PATH%
SET NAME=ticket2hc
SET KEY=.\key.pem
SET SRC=.\app\
SET TARGET=.\build\
chcp 65001
SET SEVENZIP=C:\Program Files\7-Zip\7z.exe
SET BUILDCRX=.\buildcrx.exe
ECHO Build directory: %TARGET%

CALL :clean
CALL :build
CALL :package
GOTO :eof

:build
xcopy /e /i /y /s /q /exclude:ignore.txt "%SRC%*" "%TARGET%"
PUSHD %TARGET%
FOR /R %%g IN ("*.js") DO (
	CALL uglifyjs "%%g" --compress -m -v --output "%%g"
)
POPD
GOTO :eof


:clean
RD /S /Q %TARGET%
MD %TARGET%
GOTO :eof

:package
START "" /b /w "%SEVENZIP%" a -tzip -mmt=4 -mx=3 "%TARGET%%NAME%.zip" "%TARGET%*" > nul
ECHO Packaged to %TARGET%%NAME%.zip
START "" /b /w "%BUILDCRX%" %TARGET%%NAME%.zip %KEY% %TARGET%%NAME%.crx
GOTO :eof

GOTO :eof

ENDLOCAL