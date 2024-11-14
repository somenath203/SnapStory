from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from PIL import Image
import io
import os  
from dotenv import load_dotenv


load_dotenv()


app = FastAPI(title="Image Story Generator API")


origins = ["*"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))


model = genai.GenerativeModel('gemini-1.5-flash')


@app.post("/describe-image")
async def describe_image(imageInputByUser: UploadFile = File(...)):

    try:

        image_content = await imageInputByUser.read()

        img = Image.open(io.BytesIO(image_content))
        
        response = model.generate_content(["Please create a very short story inspired by this image. Return the story as plain text, without any markdown or special formatting.", img])
        
        return {
            'success': True,
            'message': response.text
        }
    
    except Exception as e:

        return {
            'success': False,
            'message': str(e)
        }