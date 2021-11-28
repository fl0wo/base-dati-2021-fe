#Login Component

- Make login button do httpRequest

curl --location --request GET 'http://vps-487579d2.vps.ovh.net:5000/login' \
--header 'username: flo2' \
--header 'password: flo' \
--header 'Authorization: Basic ZmxvOmZsbw=='
->
- {
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQwOWI0NjQ1LWE1YTctNGU0Yi05NDNiLTllNGMyODU4NTQ1MSIsImV4cCI6MTYzODExMzU1N30.NlRuPOoLbGkjRC6-WFnJpiKJO18loMD31cwb5-0A5f4"
  }

- Return to home component userObject:User

#Register Component

- Make register button do httpRequest

curl --location --request GET 'http://vps-487579d2.vps.ovh.net:5000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
"email" : "flo",
"password" : "flo"
}'

- Return allert "Registered successful"
- If already registered return "already registered"
  {
  "message": "already registered/successfully"
  }
