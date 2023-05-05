if [[ -z "$CONFIG_EXPORT_PATH" ]]; then
  echo "\$CONFIG_EXPORT_PATH not defined"
  return
fi

kubectl vaultlogin secret/data/DromUpGrade/"$OVERLAY"/kubectl

SECRETS_PATH="$CONFIG_EXPORT_PATH/secrets"

vault2dotenv -p secret/data/DromUpGrade/"$OVERLAY"/jwt -field PRIVATE_KEY > "$SECRETS_PATH"/jwt/private.pem
vault2dotenv -p secret/data/DromUpGrade/"$OVERLAY"/jwt -field PUBLIC_KEY > "$SECRETS_PATH"/jwt/public.pem
