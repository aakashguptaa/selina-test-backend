export interface SelinaRoomBooking{
    id:string   
    roomId:string
    checkInTimestamp:number
    checkOutTimestamp:number
    bookedBy: string
    totalPrice:number
}