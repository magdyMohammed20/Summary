(1) module re-exporting
------------------------
==> export the module from another module
==> As seen above, Modules can export their internal providers.In addition, 
    they can re-export modules that they import.In the example below, 
    the MessagesModule is both imported into and exported from the chat, 
    making it available for other modules which import this one.

    chat.module.ts
    ----------------

    import { Module } from '@nestjs/common';
    import { MessagesModule } from 'src/messages/messages.module';

    @Module({
        imports: [MessagesModule], // Import the MessagesModule
        exports: [MessagesModule], // Export the MessagesModule so it can be used in other modules
    })
    export class ChatModule {}

