#create a new page
#usage: new.page.sh <page name>
#example: new.page.sh mypage
#creates a file in the root of the project called mypage.html
#creates a file in ./js/pages called mypage.page.js
#creates a file in ./js/styles called mypage.style.js
#creates a file in ./sass/pages called mypage.page.scss

#check if page name was passed
if [ -z "$1" ]
  then
    echo "No page name supplied"
    exit 1
fi

#check if page already exists
if [ -f "$1.html" ]
  then
    echo "Page already exists"
    exit 1
fi

#check if page already exists
if [ -f "./js/pages/$1.page.js" ]
  then
    echo "Page already exists"
    exit 1
fi

#check if page already exists
if [ -f "./js/styles/$1.style.js" ]
  then
    echo "Page already exists"
    exit 1
fi

#check if page already exists
if [ -f "./sass/pages/$1.page.scss" ]
  then
    echo "Page already exists"
    exit 1
fi
#name capitalised
nameCapitalized="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"
#remove spaces and dashes
nameCapitalized=${nameCapitalized// /}
nameCapitalized=${nameCapitalized//-/}

#create page.html from templates/page.html
cp templates/page.html $1.html
#replace {{name}} with $1
sed -i '' "s/{{name}}/$1/g" $1.html
#replace {{nameCapitalized}}
sed -i '' "s/{{nameCapitalized}}/$nameCapitalized/g" $1.html

#create page.page.js from templates/page.js
cp templates/page.js ./js/pages/$1.page.js
#replace {{name}} with $1
sed -i '' "s/{{name}}/$1/g" ./js/pages/$1.page.js
#replace {{nameCapitalized}}
sed -i '' "s/{{nameCapitalized}}/$nameCapitalized/g" ./js/pages/$1.page.js

#create page.style.js from templates/page.js
cp templates/page.style.js ./js/styles/$1.style.js
#replace {{name}} with $1
sed -i '' "s/{{name}}/$1/g" ./js/styles/$1.style.js
#replace {{nameCapitalized}}
sed -i '' "s/{{nameCapitalized}}/$nameCapitalized/g" ./js/styles/$1.style.js

#create page.page.scss from templates/page.scss
cp templates/page.scss ./sass/pages/$1.page.scss
#replace {{name}} with $1
sed -i '' "s/{{name}}/$1/g" ./sass/pages/$1.page.scss
#replace {{nameCapitalized}}
sed -i '' "s/{{nameCapitalized}}/$nameCapitalized/g" ./sass/pages/$1.page.scss

#push the page to pages array in build.sh declare -a pages=("gallery")
sed -i '' "s/declare -a pages=(\"gallery\" \"components-iframe-prod\" \"components-iframe-elkano\")/declare -a pages=(\"gallery\" \"components-iframe-prod\" \"components-iframe-elkano\")\npages+=(\"$1\")/g" build.sh

#add page to webpack.common.js
#before 'loading': ['./js/components/loading.js'],
#example: 'loading': ['./js/components/loading.js'],'mypage.style': ['./js/styles/mypage.style.js'],
sed -i '' "s/'loading': \['.\/js\/components\/loading.js'\]/'loading': \['.\/js\/components\/loading.js'\],\n\t\t\t\'$1.style': \['.\/js\/styles\/$1.style.js'\]/g" webpack.common.js