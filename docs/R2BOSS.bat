@ECHO OFF
setlocal EnableDelayedExpansion
  
PUSHD %~DP0 & cd /d "%~dp0"
%1 %2
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :target","","runas",1)(window.close)&goto :eof
:target
  
python .\R2BOSS.py
  
echo All Operations Were Done!
  
pause > nul
exit