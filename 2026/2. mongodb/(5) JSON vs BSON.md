# JSON vs BSON

## JSON
- Stands for JavaScript Object Notation
- Text-based format (UTF-8)
- Human-readable, so you can open and edit it in any text editor
- Supports only basic types: string, number, boolean, null, array, object
- Has one generic "number" type, with no separate int, long, or decimal
- Has no native Date type (dates are usually stored as strings)
- Has no native binary data support (needs Base64 encoding)
- Slower to parse, since text must be read sequentially
- Often smaller for simple data
- Universal standard, used in APIs, config files, and web data exchange

## BSON
- Stands for Binary JSON
- Binary format (stored as bytes)
- Not human-readable, so it needs a tool to view
- Supports all JSON types plus Date, ObjectId, Int32, Int64, Double, Decimal128, Binary, Regex, and Timestamp
- Has distinct numeric types, so values are more precise
- Has a native Date type
- Has native binary data support
- Faster to scan, since fields carry length prefixes that let parsers skip ahead
- Can be slightly larger because of the type and length metadata
- Used mainly by MongoDB for storage and network communication

## Key differences
- **Readability:** JSON is readable, BSON is not
- **Types:** BSON has many more types than JSON
- **Speed:** BSON is faster to traverse and query
- **Size:** BSON can be bigger, JSON is usually more compact for simple data
- **Use case:** JSON for data exchange, BSON for database storage

## In MongoDB
- You write JSON-like documents in `mongosh` or your code
- The driver converts them to BSON automatically
- MongoDB stores and queries the data as BSON