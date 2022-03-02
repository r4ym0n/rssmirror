#! /bin/bash
FPWD=`cd $(dirname "$0");pwd`
# echo $FPWD
BASE_PATH=$FPWD/../
PAGE_BASE_PATH=$BASE_PATH/pages/homepage
SERVER_BASE_PATH=$BASE_PATH/server
cd $BASE_PATH

installdepends() {
    cd $PAGE_BASE_PATH && npm i 1>/dev/null 2>&1
}
buildweb() {
    pushd . 1>/dev/null 2>&1 
    cd $PAGE_BASE_PATH
    npm run build 1>/dev/null
    popd 1>/dev/null 2>&1
}

cp2server() {
    pushd . 1>/dev/null 2>&1
    # denger Clean
    if [ $ISDEV ];then
        rm -f $SERVER_BASE_PATH/public/app/
        mv $PAGE_BASE_PATH/build $SERVER_BASE_PATH/public/app
        rm -rf $PAGE_BASE_PATH 
        echo "remove react dev"
    else
        echo "DONT exec this file on dev-env"
    fi
    echo $SERVER_BASE_PATH
    cd $SERVER_BASE_PATH && npm install --production 1>/dev/null 
    popd 1>/dev/null 2>&1
}
installdepends
buildweb
cp2server

curl ifconfig.me

echo "Bash Build OK!"
