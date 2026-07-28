(1) route wildcard
--------------------
==> let you match dynamic or unknown route segments

    // consider the order of the routes here the wildcard route should be before the dynamic route as if route not matched will render the dynamic route
    // instead of * we can put any character
    // EX: /users/abfcd , /users/ab1cd , /users/abxcd , ....
    @Get('ab*cd')
    getWithWildcard() {
        return "Wild Card Data"
    }


    // Get user by id
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): User | undefined {
        return this.UsersService.getUserById(id)
    }

(2) another usage for wildcard
--------------------------------
==> if user need to serve '/users/1/details'

    // wildcard
    @Get('*/details')
    getWithDetails() {
        return `Details Data`
    }

(3) handle not found route with wildcard
-----------------------------------------

    // 404 route
    @Get('*')
    get404() {
        return '404 Not Found'
    }