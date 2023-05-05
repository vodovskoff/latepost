### !!! ATTENTION !!! This does not work with environment variables with spaces

if [[ -z "$ENV_CONFIG_PATH" ]]; then
  echo "\$ENV_CONFIG_PATH not defined"
  exit
fi

if [[ ! -f "$ENV_CONFIG_PATH" ]]; then
  echo "$ENV_CONFIG_PATH does not exist."
  exit
fi

function make_variables_regexp() {
  echo "^\($(grep '=' | sed -r 's/=.*//' | xargs | sed 's/ /\\|/g')\)="
}

# read environment variables from stdin
cat > "$ENV_CONFIG_PATH.tmp.current"

DEFAULT_CONFIG_VARIABLES_REGEXP=$(make_variables_regexp < "$ENV_CONFIG_PATH")
CURRENT_CONFIG_VARIABLES_REGEXP=$(grep -e "$DEFAULT_CONFIG_VARIABLES_REGEXP" "$ENV_CONFIG_PATH.tmp.current" | make_variables_regexp)

grep -e "$CURRENT_CONFIG_VARIABLES_REGEXP" "$ENV_CONFIG_PATH.tmp.current" > "$ENV_CONFIG_PATH.tmp"
grep -v -e "$CURRENT_CONFIG_VARIABLES_REGEXP" "$ENV_CONFIG_PATH" >> "$ENV_CONFIG_PATH.tmp"

grep -v "^$" "$ENV_CONFIG_PATH".tmp | grep "=" | sort > "$ENV_CONFIG_PATH"
rm "$ENV_CONFIG_PATH.tmp"*
