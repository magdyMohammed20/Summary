(1) nested modules
--------------------
==> create 'chats' module using (nest g mo chats) then create 'messages' module
    and can imports 'chats' in 'app.module.ts' file but never for 'messages'
    and inside 'chats.module.ts' can import the 'messages' module


    src/messages/messages.module.ts
    ----------------------------------
    import { Module } from '@nestjs/common';

    @Module({})
    export class MessagesModule {}


    src/chats/chats.module.ts
    ----------------------------------
    import { Module } from '@nestjs/common';
    import { MessagesModule } from 'src/messages/messages.module';

    @Module({
        imports: [MessagesModule], // Import the MessagesModule
    })
    export class ChatsModule {}


    src/app.module.ts
    ----------------------------------
    import { Module } from '@nestjs/common';
    import { ChatsModule } from './chats/chats.module';

    @Module({
        imports: [ChatsModule], // Import the ChatsModule
    })
    export class AppModule {}
