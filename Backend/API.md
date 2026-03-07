## Dev_Tinder API's :
------------------------

# authRouter :

---

        - POST /signup
        - POST /login
        - POST /logout

# profileRouter :

---

        - GET /profile
        - PATCH /profile/edit
        - PATCH /profile/password

# connectionRequestRouter :

---

        - POST /request/send/{ interested -- ignored }/:userID
        - POST /request/review/{ accepted -- rejected }/:requestID

# userRouter :

---

        - GET /user/connections
        - GET /user/requests/recived
        - GET /feed - Gets you the profiles of others users on platform
