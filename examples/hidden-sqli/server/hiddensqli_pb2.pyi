from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class SearchRequest(_message.Message):
    __slots__ = ["search_word", "hidden_param"]
    SEARCH_WORD_FIELD_NUMBER: _ClassVar[int]
    HIDDEN_PARAM_FIELD_NUMBER: _ClassVar[int]
    search_word: str
    hidden_param: str
    def __init__(self, search_word: _Optional[str] = ..., hidden_param: _Optional[str] = ...) -> None: ...

class SearchHiddenRequest(_message.Message):
    __slots__ = ["search_hidden_word"]
    SEARCH_HIDDEN_WORD_FIELD_NUMBER: _ClassVar[int]
    search_hidden_word: str
    def __init__(self, search_hidden_word: _Optional[str] = ...) -> None: ...

class SearchResponse(_message.Message):
    __slots__ = ["result"]
    RESULT_FIELD_NUMBER: _ClassVar[int]
    result: str
    def __init__(self, result: _Optional[str] = ...) -> None: ...
