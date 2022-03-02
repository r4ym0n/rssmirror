#! /bin/bash
FPWD=`cd $(dirname "$0");pwd`
# echo $FPWD
BASE_PATH=$FPWD/..
PAGE_BASE_PATH=$BASE_PATH/pages/homepage
SERVER_BASE_PATH=$BASE_PATH/server
cd $BASE_PATH

installdepends() {
    echo "Installing dependencies..."
    cd $PAGE_BASE_PATH && npm i 1>/dev/null 2>&1
}

buildweb() {
    pushd . 1>/dev/null 2>&1 
    cd $PAGE_BASE_PATH
    echo "working on ${PAGE_BASE_PATH}"
    echo "start build web"
    npm run build 1>/dev/null
    echo "build web success"
    popd 1>/dev/null 2>&1
}

cp2server() {
    pushd . 1>/dev/null 2>&1
    echo "working on ${PAGE_BASE_PATH}"

    # denger Clean
    if [ $ISDEV ];then
        # rm -rf $SERVER_BASE_PATH/public/app/
        echo "mving ${PAGE_BASE_PATH}/build to ${SERVER_BASE_PATH}/public/app/"
        mv $PAGE_BASE_PATH/build $SERVER_BASE_PATH/public/app
        # rm -rf $PAGE_BASE_PATH 
        echo "web placed in ${SERVER_BASE_PATH}/public/app/"
    else
        mv $PAGE_BASE_PATH/build $SERVER_BASE_PATH/public/app
        echo "mving ${PAGE_BASE_PATH}/build to ${SERVER_BASE_PATH}/public/app/"
        echo "DONT exec this file on dev-env"
    fi
    echo $SERVER_BASE_PATH
    cd $SERVER_BASE_PATH && npm install --production 1>/dev/null 
    popd 1>/dev/null 2>&1
}

installdepends
buildweb
cp2server

echo 'Server IP' `curl ifconfig.me -q 2>/dev/null`
echo 
echo "Bash Build OK!"
