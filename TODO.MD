#Login/Register Component
- Return to home component userObject:User
- Handle errors

#Slots
- Popolare tabella slots
- creare component per il singolo giorno in dettaglio
- ROTTE:

-
-
- TANSAZIONE { WeightRoom Reservation (comprende 1 slot) + Reservation}


Me as a MANAGER :
2) if role >= manager add slot button


Me as CUSTOMER :
2) if role == user subscribe to this slot
        -> TANSAZIONE {WeightRoom Reservation (comprende 1 slot) + Reservation}
3) want to see slots from calendar
4) if
        free_capacity > 60       green
        60 > free_capacity > 30  orange
        30 > free_capacity       red

- Create Singleton for slots and refresh slots when needed
  - User must have array of giorni prenotati

