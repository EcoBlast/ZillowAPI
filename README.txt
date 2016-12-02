How to run : 
1. Unzip kulahari.zip
2. Go to the unzipped directory
3. Run "npm install"
4. Run "node bin/www"
5. Hit the below api for storing the results in database: 
	URL: http://localhost:3000/api/zillow
	Method: POST
	Input: 
		{
			"first_name": "Dheeraj",
			"last_name": "Batra",
			"phone": "+919971701509",
			"email": "codedhrj@gmail.com",
			"address": "2114 Bigelow Ave",
			"city": "WA",
			"zip_code": "98101"
		}
	Output: 
		If error, it will generate the error. 
		Otherwise:
			{
  				"message": "Request successfully processed"
			}
6. I added one more api, so that you can get the results from db. 
	URL: http://localhost:3000/api/zillow
	Method: GET
	Output: List of all the zillow data saved