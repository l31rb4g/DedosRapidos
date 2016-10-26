#/bin/bash

function kkk {
    pid=$(ps aux | grep 'php -S localhost:9001' | grep -v grep | awk '{print $2}')
    if [ "$pid" ]; then
        kill $pid > /dev/null 2>&1
    fi

    pid=$(ps aux | grep 'Xvfb :8' | grep -v grep | awk '{print $2}')
    if [ "$pid" ]; then
        kill $pid > /dev/null 2>&1
    fi
}

kkk
cd /home/l31rb4g/www/DedosRapidos
(Xvfb :8)&
export DISPLAY=:8
(php -S localhost:9001 > /dev/null 2>&1)&
env PATH=$PATH:/home/l31rb4g/www/drivers /home/l31rb4g/www/DedosRapidos/tests.py
kkk

