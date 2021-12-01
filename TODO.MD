#Login/Register Component
- Return to home component userObject:User
- Handle errors

#Slots
- Popolare tabella slots
- creare component per il singolo giorno in dettaglio
- ROTTE:
- getAllSlots => [{}] select *, count (*) as current weightroomreservation w inner join
slot s on slot.id=w.slot
group by slot.id, count (*)
-
-
  - TANSAZIONE { WeightRoom Reservation (comprende 1 slot) + Reservation}
