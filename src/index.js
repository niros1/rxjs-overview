import { fromEvent, timer } from 'rxjs';
import  { map, bufferTime, debounce, tap, buffer, filter } from 'rxjs/operators';

//create observable that emits click events
const source$ = fromEvent(document, 'click');
//map to string with given event timestamp
const example = source$.pipe(
    map(event => `Event time: ${event.timeStamp}`),
    buffer(
        source$.pipe(debounce(() => timer(250))
    )),
    tap(arr => console.log('clicks', arr.length)),
    filter(arr => arr.length > 1),
    // tap(arr =>)

);


//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log('double click occur', val));


