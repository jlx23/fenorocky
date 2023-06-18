from flask import Flask, request, redirect
import requests

app = Flask(__name__)

# Set these values
client_id = "<YOUR_CLIENT_ID>"
client_secret = "<YOUR_CLIENT_SECRET>"
redirect_uri = "<YOUR_REDIRECT_URI>"  # This should be a full URL

@app.route("/")
def index():
    # Step 1: Direct your user to the Instagram OAuth URL
    return redirect(f"https://api.instagram.com/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=user_profile,user_media&response_type=code")

@app.route("/callback")
def callback():
    # Step 2: User is redirected back to your app, get the code from the request
    code = request.args.get('code')

    # Step 3: Request the access token from the token endpoint
    access_token_response = requests.post(
        "https://api.instagram.com/oauth/access_token",
        data={
            "client_id": client_id,
            "client_secret": client_secret,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
            "code": code,
        },
    )
    access_token = access_token_response.json()['access_token']

    # Step 4: Use this token to access the API endpoints
    user_media_response = requests.get(
        f"https://graph.instagram.com/me/media?fields=id,caption&access_token={access_token}"
    )
    user_media = user_media_response.json()

    # Return the user's media
    return user_media

if __name__ == "__main__":
    app.run(debug=True)
