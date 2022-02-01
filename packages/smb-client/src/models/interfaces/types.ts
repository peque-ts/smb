import { ICommand, ICommandTypes } from '@pequehq/smb-commons';

export type Listener = (command: ICommand<ICommandTypes, unknown>) => void;
