#Array of pages
declare -a pages=("gallery" "components-iframe-prod" "components-iframe-internal")
pages+=("index-sports")

rm -rf dist/assets/
rm -rf dist/js/assets/
mkdir -p dist/assets/
mkdir -p dist/css/
cp -r assets/* dist/assets/

cp -r js/* dist/js/
rm -rf dist/js/components/loading.js
rm -rf dist/js/styles/

cp *.html dist/

mv -v dist/js/*.css dist/css
for i in "${pages[@]}"
  do assets_name="$i"
  if [ "$i" == "components-iframe-prod" ] || [ "$i" == "components-iframe-internal" ]; then
    assets_name="components-iframe"
  fi
  mv -v dist/css/$assets_name.style.css dist/css/$assets_name.css
done

sass --style=compressed --no-source-map sass/components/loading.scss ./dist/css/loading.css
sass --style=expanded --no-source-map sass/styles.scss ./dist/css/common.css

# If OSX
if [[ "$OSTYPE" == "darwin"* ]]; then
  find dist/css -type f -exec sed -E -i '' 's/\.\.\/\.\.\/assets\/|\.\/assets\//\.\.\/assets\//g' {} \;
  find dist/js/*.js -type f -exec sed -i '' "s|../../../assets/|./assets/|g" {} \;

  TAB=$'\t'
  BS=$'\\\n'

  rm -rf ./temp

  LOADING="${TAB}<link id=\"loadingStyles\" rel=\"stylesheet\" href=\"./css/loading.css\">${BS}</head>";
  COMMON="${TAB}<link id=\"commonStyles\" rel=\"stylesheet\" href=\"./css/common.css\">${BS}</head>";

  find dist/*.html -type f -exec sed -i '' "s|<\/head>|$LOADING|g" {} \;
  find dist/*.html -type f -exec sed -i '' "s|<\/head>|$COMMON|g" {} \;
  find dist/*.html -type f -exec sed -i '' "s|/loading.js|./js/loading.js|g" {} \;

  #for each page
  for i in "${pages[@]}"
    do assets_name="$i"
    if [ "$i" == "components-iframe-prod" ] || [ "$i" == "components-iframe-internal" ]; then
      assets_name="components-iframe"
    fi
    STYLES="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/$assets_name.css\"/>${BS}</head>";
    sed -i '' $"s|<\/head>|$STYLES|g" dist/$i.html
    #remove <script type="text/javascript" src="/$i.style.js"></script>
    sed -i '' $"s|<script type=\"text/javascript\" src=\"\/$assets_name.style.js\"><\/script>||g" dist/$i.html
    #delete dist/js/$i.style.js
    rm -rf dist/js/$assets_name.style.js
  done

else
  # If Linux
  find dist/css -type f -exec sed -E -i 's/\.\.\/\.\.\/assets\/|\.\/assets\//\.\.\/assets\//g' {} \;
fi

  

COMMON="${TAB}<link id=\"commonStyles\" rel=\"stylesheet\" href=\"./css/common.css\">${BS}</head>";

STYLES_HOME="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/home.css\"/>${BS}</head>";
STYLES_EVENTS="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/events.css\"/>${BS}</head>";
STYLES_REGISTER="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/register.css\"/>${BS}</head>";
STYLES_EVENTS="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/events.css\"/>${BS}</head>";
STYLES_CALENDAR="${TAB}<link id=\"mainStyles\" rel=\"stylesheet\" href=\"./css/calendar.css\"/>${BS}</head>";

find dist/*.html -type f -exec sed -i '' "s|<\/head>|$COMMON|g" {} \;

sed -i '' $"s|<\/head>|$STYLES_HOME|g" dist/index.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-assemblies.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-assemblies-2.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-all-components.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-community.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-group-meeting.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-other.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/events-user-pay.html
sed -i '' $"s|<\/head>|$STYLES_EVENTS|g" dist/stream.html
sed -i '' $"s|<\/head>|$STYLES_REGISTER|g" dist/personal-information.html
sed -i '' $"s|<\/head>|$STYLES_REGISTER|g" dist/specific-questions.html
sed -i '' $"s|<\/head>|$STYLES_REGISTER|g" dist/payment.html
sed -i '' $"s|<\/head>|$STYLES_REGISTER|g" dist/loading.html
sed -i '' $"s|<\/head>|$STYLES_REGISTER|g" dist/confirmation.html
sed -i '' $"s|<\/head>|$STYLES_CALENDAR|g" dist/calendar.html

sed -i '' $"s|<\/head>|$STYLES_HOME|g" dist/pages.html

find dist/*.html -type f -exec sed -i '' "s|/home.js|./js/home.js|g" {} \;
find dist/*.html -type f -exec sed -i '' "s|/calendar.js|./js/calendar.js|g" {} \;
find dist/*.html -type f -exec sed -i '' "s|/events.js|./js/events.js|g" {} \;
find dist/*.html -type f -exec sed -i '' "s|/register.js|./js/register.js|g" {} \;