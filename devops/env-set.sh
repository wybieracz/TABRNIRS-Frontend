echo Branch: $1

branch=${1^^}

echo "Handled keys: "

rm .env || true

set +e

while read -r variable ; do
    oldkey=$(echo $variable | cut -d'=' -f 1)
    key=${oldkey#"${branch}_"}
    echo $key
    echo ${key}=${!oldkey} >>.env
    declare ${key}=${!oldkey}
    export ${key}
done <<<$(printenv | grep ^$branch)


echo

# printenv | grep REACT 