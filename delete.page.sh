#delete the page files
#usage: delete.page.sh <page name>
#example: delete.page.sh mypage
#deletes a file in the root of the project called mypage.html
#deletes a file in ./js/pages called mypage.page.js
#deletes a file in ./js/styles called mypage.style.js
#deletes a file in ./sass/pages called mypage.page.scss

#check if page name was passed
if [ -z "$1" ]
  then
    echo "No page name supplied"
    exit 1
fi

#check if page already exists
if [ -f "$1.html" ]
  then
    rm $1.html
fi

#check if page already exists
if [ -f "./js/pages/$1.page.js" ]
  then
    rm ./js/pages/$1.page.js
fi

#check if page already exists
if [ -f "./js/styles/$1.style.js" ]
  then
    rm ./js/styles/$1.style.js
fi

#check if page already exists
if [ -f "./sass/pages/$1.page.scss" ]
  then
    rm ./sass/pages/$1.page.scss
fi

#update the page array in build.sh
sed -i '' "s/pages+=(\"$1\")//g" build.sh
#max 2 empty lines
sed -i '' "/^$/N;/^\n$/D" build.sh


#update the entries array in webpack.common.js 'mypage.style': ['./js/styles/mypage.style.js']
#remove the entry from the array and the \n at the end of the line, so we don't have an empty line after the entry is removed
sed -i '' "s/.*\'$1.style\': \[.*\],//g" webpack.common.js
#max 2 empty lines
sed -i '' "/^$/N;/^\n$/D" webpack.common.js