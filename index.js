let slots = [];

//  create parking lot
let create_parking_lot = (n) => {
    slots.length = n;
    for (i = 0; i < n; i++) { slots[i] = { slot: i + 1, no_pol: '', warna: '', tipe: '', start: undefined } }
    console.log(`Created parking lot with ${n} slots`)
}

// park vehicle (checkin)
let park = (no_pol, warna, tipe, waktu) => {
    if (validNoPol(no_pol) && validTipe(tipe)) {
        let slot = slots.find(x => x.no_pol == '');
        if (slot) {
            slot.no_pol = no_pol;
            slot.warna = warna;
            slot.tipe = tipe;
            slot.start = waktu == undefined ? new Date() : waktu;
            console.log(`Allocated slot number: ${slot.slot}`)
        } else {
            console.log('Sorry, parking lot is full');
        }
    } else {
        console.log(`Sorry, invalid vehicle`)
    }
}

// leave from park area (checkout)
let leave = (n, waktu) => {
    let slot = slots.find(x => x.slot == n);
    if (slot) {
        let curTime = waktu == undefined ? new Date() : waktu;
        let duration = Math.ceil((curTime - slot.start) / (1000 * 60 * 60)); //calculate hour duration from milisecond
        console.log(slot);
        console.log(`Park duration : ${duration} hours`);
        slot.no_pol = '';
        slot.warna = '';
        slot.tipe = '';
        slot.start = undefined;
        console.log(`Slot number ${n} is free`)
    } else {
        console('Invalid slot number');
    }
}

// validation
let validNoPol = (no_pol) => {
    var matches = no_pol.match(/(^[A-Za-z]+.\d+.[A-Za-z]+$)/);
    return matches !== null;
}
let validTipe = (tipe) => {return tipe.toLowerCase() === 'mobil' || tipe.toLowerCase() === 'motor'}

// check even/odd no pol
let isEvenPlat = (no_pol) => {
    var matches = no_pol.match(/(\d+)/);
    return parseInt(matches) % 2 == 0;
}

// search vehicle by no pol
let searchVehicle = (no_pol) => {
    let slot = slots.find(x => x.no_pol == no_pol);
    if (slot){
        console.log(slot);
    } else {
        console.log('Not found');
    }
}

// reporting =====================================
// get vehicle on park area by tipe
let typeOfVehicle = (t) => { console.log(`Number of ${t} : ${slots.filter(x => x.tipe.toLowerCase() == t.toLowerCase()).length}`) }
// show slots status 
let lotStatus = () => { console.table(slots) }
//show allocated slots
let allocatedLot = () => { console.table(slots.filter(x => x.no_pol !== '')) }
// show available slots
let availableLot = () => { console.table(slots.filter(x => x.no_pol == '')) }
// show even no pol on lot
let evenLot = () => { console.table(slots.filter(x => isEvenPlat(x.no_pol)))}
// show odd no pol on lot
let oddLot = () => { console.table(slots.filter(x => !isEvenPlat(x.no_pol)))}

// example execution =====================================
create_parking_lot(6);
park('B-1234-XYZ', 'Putih', 'Mobil', new Date(2022, 2, 8, 8));
park('B-9999-XYZ', 'Putih', 'Motor', new Date(2022, 2, 8, 9));
park('D-0001-HIJ', 'Hitam', 'Mobil');
park('B-7777-DEF', 'Red', 'Mobil', new Date(2022, 2, 8, 10));
park('B-2701-XXX', 'Biru', 'Mobil');
park('B-3141-ZZZ', 'Hitam', 'Motor');
leave(4, new Date(2022, 2, 8, 11, 10));
lotStatus();
park('B-333-SSS', 'Putih', 'Mobil');
park('A-1212-GGG', 'Putih', 'Mobil');
typeOfVehicle('Motor');
typeOfVehicle('Mobil');
evenLot();
oddLot();
searchVehicle('B-2701-XXX');
searchVehicle('D-2701-XXX');
