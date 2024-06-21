from pydantic import BaseModel


class LocationSearch(BaseModel):
    location: str
