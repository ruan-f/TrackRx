from fastapi import FastAPI

# Create an instance of FastAPI
app = FastAPI()

# make a data structure or sum and like the store the stuff here

# when u click the checkmark ur gonna call the API and store the current properties

# Define a route with a simple GET method
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Define another route that accepts a parameter
@app.get("/greet/{name}")
def greet(name: str):
    return {"message": f"Hello, {name}!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="10.184.94.2", port=8000)
