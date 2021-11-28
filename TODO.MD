#Login Component

- Make login button do httpRequest

  curl --location --request GET 'http://localhost:5000/login' \
  --header 'username: flo' \
  --header 'email: flo' \
  --header 'password: flo' \
  --header 'Authorization: Basic ZmxvOmZsbw=='

- Return to home component userObject:User

#Register Component

- Make register button do httpRequest

curl --location --request GET 'http://localhost:5000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "flo",
"password" : "flo"
}'

- Return allert "Registered successful"
- If already registered return "already registered"
