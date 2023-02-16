import { Request } from 'express';
import { AuthUser } from './AuthUser';

export declare type AuthRequest = Request & { user: AuthUser }