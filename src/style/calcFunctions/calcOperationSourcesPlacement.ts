import {Operation} from "../../models/Operation";
import {Source} from "../../models/Source";

/**
 * Berechnet die Platzierung basierend auf der Anzahl der Elemente (Operationen oder Quellen) und dem Gerätetyp.
 *
 * @param objects - Die Operationen oder Quellen, deren Platzierung berechnet werden soll.
 * @param isTabletOrGreater - Gibt an, ob das Gerät ein Tablet oder größer ist.
 * @return Gibt einen String in der Form 'repeat(n, 1fr)' zurück, wobei n die Anzahl der Spalten ist, die auf Basis der Anzahl der Elemente und des Gerätetyps berechnet wird.
 */
export const calcPlacement = (objects: Operation[] | Source[] | undefined, isTabletOrGreater: boolean) => {
    if (!objects || objects.length === 0) {
        return 'repeat(1, 1fr)';
    }

    const num = isTabletOrGreater ? Math.min(objects.length, 6) : Math.min(objects.length, 3);

    return `repeat(${num}, 1fr)`;
}
