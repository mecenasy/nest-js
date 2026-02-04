import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  SerializeOptions,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AssetsInterceptor } from 'src/interceptors/asset.interceptor';
import { SendMessageDto } from './dto/send-message.dto';
import { FilesMessages } from 'src/interceptors/fie.interceptor';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { MessageService } from './message.service';
import { SendMessageResponse } from './response/send-message.response';
import { GetMessagesResponse } from './response/get-messages.response';
import { Message } from './entity/message.entity';
import { GetMessageResponse } from './response/get-message.response';
import { AssetsPath } from 'src/decorators/assets-path.decorator';

@Controller('message')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(AssetsInterceptor)
@SerializeOptions({ strategy: 'excludeAll' })
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @UseInterceptors(FilesMessages)
  public async sendMessage(
    @Body() body: SendMessageDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUserId() id: string,
  ) {
    const message = await this.messageService.saveMessage(body, files, id);
    return new SendMessageResponse({
      ...message,
      from: message.from.id,
      to: message.to.id,
      parent: message.parent?.id,
      files: undefined,
    });
  }

  @Get('all')
  public async getAllMessage(
    @CurrentUserId() userId: string,
  ): Promise<GetMessagesResponse> {
    const [messages, count] = await this.messageService.getMessages(userId);
    return new GetMessagesResponse({
      messages: messages.map((message) => ({
        id: message.id,
        title: message.title,
        isReaded: message.isReaded,
      })),
      count,
    });
  }

  @Get(':id')
  @AssetsPath('/messages')
  public async getMessageById(@Param('id') id: string) {
    const message = await this.messageService.getMessageById(id);

    return this.convertMessage(message);
  }

  private convertMessage = (message: Message): GetMessageResponse => {
    return new GetMessageResponse({
      ...message,
      from: message.from.id,
      to: message.to.id,
      replies: message.replies?.map(this.convertMessage),
      files: message.files?.map((file) => ({
        path: file.name,
        name: file.originalName,
      })),
    });
  };
}
