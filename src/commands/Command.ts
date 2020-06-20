import { GuildMember, Message, PermissionString } from 'discord.js'
import { SuperClient } from '../Asena';

interface CommandOptions{
    name: string
    aliases: string[],
    description: string,
    usage: string | null,
    permission: PermissionString | undefined
}

export abstract class Command{

    protected constructor(protected readonly options: CommandOptions){}

    public get name(): string{
        return this.options.name
    }

    public get aliases(): string[]{
        return this.options.aliases
    }

    public get description(): string{
        return this.options.description
    }

    public get usage(): string | null{
        return this.options.usage
    }

    public get permission(): string | undefined{
        return this.options.permission
    }

    public hasPermission(member: GuildMember): boolean{
        if(this.options.permission){
            return member.hasPermission(this.options.permission)
        }

        return true
    }

    public async abstract run(client: SuperClient, message: Message, args: string[]): Promise<boolean>

}