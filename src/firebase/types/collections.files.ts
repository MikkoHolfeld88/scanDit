import {REALTIME_DATABASE_PATHS} from "../../constants/realtimeDatabasePaths";

export type RealtimeDatabasePaths = typeof REALTIME_DATABASE_PATHS;
export type File = {
    uploaded: string,
    filename: string,
    url: string
}

/**
 * Der Typ `CollectionsFiles` repräsentiert eine Struktur zur Speicherung von
 * Sammlungsdaten in der RealtimeDatabase.
 *
 * Jeder Schlüssel in `CollectionsFiles` entspricht einem Schlüssel in den
 * `REALTIME_DATABASE_PATHS`. Dies sind die Arten von Dateien, die wir in unserer Anwendung behandeln.
 *
 * Jeder Schlüssel in `CollectionsFiles` ist optional und wenn er vorhanden ist,
 * sollte er mit einem Array von Strings assoziiert sein. Jeder String in diesem Array
 * stellt eine URL dar, die auf eine Datei in Firebase Storage verweist.
 *
 * Diese Struktur ermöglicht es uns, auf effiziente Weise auf die Dateien zuzugreifen, die
 * einem bestimmten Benutzer (identifiziert durch die User ID) und einem bestimmten
 * Dateityp (identifiziert durch den Schlüssel) zugeordnet sind.
 */
export type CollectionsFiles = {
    [K in keyof RealtimeDatabasePaths]?: File[];
}
