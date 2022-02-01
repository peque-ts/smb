import { ICommand, ICommandTypes } from '@pequehq/smb-commons';

export type Listener<T = any> = (command: ICommand<ICommandTypes, T>) => void;
