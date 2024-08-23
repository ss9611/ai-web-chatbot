# app.py
import os
import openai
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Set OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to interact with the chatbot
def chatbot(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.7
    )
    return response['choices'][0]['message']['content'].strip()

@app.route("/")
def index():
    return render_template("index.html")  # Render the index.html file from the templates directory

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("prompt")
    if user_message:
        bot_response = chatbot(user_message)
        return jsonify({"response": bot_response})
    return jsonify({"response": "No prompt provided"}), 400


if __name__ == "__main__":
    app.run(debug=True)
