import httpx


class UserAlreadyActed(Exception):
    def __init__(self, message = "Action already executed before"):
        self.message = message
        super().__init__(message)

class UserNotFound(Exception):
        def __init__(self):
            super().__init__("User not found")

class IncorrectCredentials(Exception):
    def __init__(self):
        super().__init__("Incorrect credentials")

class CooldownException(Exception):
    def __init__(self, seconds:int):
        self.message = f"Kindly wait {seconds//60} minutes, {seconds%60} seconds before trying again."
        super().__init__(self.message)
        
class APIException(Exception):
     def __init__(self, message = "External service error"):
          self.message = message
          super().__init__(self.message)

class TokenException(Exception):
     def __init__(self, message = "Invalid token"):
          self.message = message
          super().__init__(message)

class URLError(Exception):
    def __init__(self, url: str, original_error: Exception = None):
        self.message = f"URL not accessible: {url}"
        self.original_error = original_error
        super().__init__(self.message)


class ArticleParsingException(Exception):
    def __init__(self, field: str, message="Required field missing in response"):
        self.message = f"{message}: {field}"
        super().__init__(self.message)


class ArticleSummarizationException(Exception):
    def __init__(self, message="Failed to summarize article"):
        self.message = message
        super().__init__(message)


RETRYABLE_NETWORK_ERRORS = (
    httpx.ConnectError,      # Cannot connect to the server
    httpx.ConnectTimeout,    # Connection took too long to establish
    httpx.ReadTimeout,       # Server started sending but then stopped
    httpx.WriteTimeout,      # We couldn't send our request fast enough
    httpx.PoolTimeout,       # All our local connections are busy
    httpx.RemoteProtocolError # Connection closed unexpectedly by the site
)