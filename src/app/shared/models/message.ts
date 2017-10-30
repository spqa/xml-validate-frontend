import {CodeFile} from "./code-file";
import {ResourceFile} from "./resource-file";

export class Message {
  public id: number;
  public ja: string;
  public vi: string;
  public en: string;
  public message_key: string;
  public final: string;
  public applied: boolean;
  public code_file_id: number;
  public resource_file_id: number;
  public code_file: CodeFile;
  public resource_file: ResourceFile;
  public updated_by: string;
  public updated_at: string;
  public created_at: string;
}
