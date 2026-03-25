## S02 - Episode - 08 : Data Sanitization & Schema Validation :

---

Most Imp Validations :
If you remember only 10 things, remember these:

1.required : true; - mantaory Field
2.unique : true; - unique Email id
3.minLength / maxLength : for ( Characters )
4.min / max : for ( Numbers )
5.enum : used where fix val of options are avilable for Ex : gerder : male , female or others
6.match : match is used in email Validation checking the regex and mathing it with regex.
7.trim - we can use in firstName , lastName or else for emailID
8.lowercase - Mostly we use for emailID is should be in lowercase
9.default - " They takes Text/Numbers as default value "
10.select: false : when u try to get the data then password will be hidden or u can't access
11.timeStamps : true - it will provide data and time both ones the user login works on updating as well as

These cover 90% of real-world MongoDB projects.

IMP : Also for email passwrod , phone no validations we have Validator library
for installation -- npm i validator

## => S02 - Episode - 09 : About Validators

---

    Validting the req.body data before passing to sechema lev checking
    by creating utils folder and calling the functions validators after getting the req.body
    for Ex : for signUp Users
              : for login Users

## => S02 - Episode - 10 : JWT , Tokens and Authentication ( UserAuth )

---

    - JWT
    - Cookies
    - Authentication middlewares

    libraries :
    ----------
    npm i cookie-parser
    npm i jsonwebtoken

    Steps :
    --------
    - Creating a token ones you logged in ths user
    - Also you have to send the token when the user req while logins
    - Created the middleware userAuth
    - make use of it in different API's
    - good pratice u'hv studied creation of userAuth
    - how to expire the token
    - how to expire the cookies
    - how to refactor the code by creating some validating methods in UserSchema

## => S02 - Episode - 11 : Diving into API's and Express Router()

---

    Steps :
    --------
    - We are going to create express Router
    - Handling the express Route
    - Express is creating a different routes for us
    - Express is working for us creating a API from scratch
    - and it can't be modified

## => S02 - Episode - 12 : Creating API's and Index in Database

---

-> What are Index In DB ?

- An index is a data structure that makes searching data in a table much faster, just like an index in a book helps you find a topic without reading the whole book.

Without index → DB scans every row (Full Table Scan)
With index → DB finds data directly and quickly

    -->  $or query / $and query ( Logical Queries )
    -->                                         ( Comparison Queries )

    --> Schme.pre()

## => S02 - Episode - 13 : Ref and Populate

---
 Building Relation between two Collections :

- ref - is used in mongoose model to establish a relation between two collections
- Populate - is used to abstract the data from user collection
  - Syntax - .populate("senderID")
  - Syntax - .populate("senderID" , [firstName , lastName ])
  - read more about Query Paramteres 
  like { $or , $and , $nin , $ne }

## => S02 - Episode - 14 : Pagination 
------------------

Pagination - skip and limit Options are left 
-----------    while the query you have to pass for the skip and limit 
                    also validate the passing quarries skip , limitn& {age}
    Syntax : Ex. http://localhost:8000/feed?page=1&limit=10

## => Scoket.io : 

    - Installing npm i socket.io

## => Payment Integration : 

    Two Step Process : 
        - There are multiple probles acoss the razropay 
        - Now it could be related to the payment integration as well authenitication 
        - authentication need verification as well 

    Step 1 : Order is created            / createOrder
    Step 2 : Payment Verification    /  verifyPayment

