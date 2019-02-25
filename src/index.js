import { fromEvent, timer, merge, Observable, from } from 'rxjs';
import  { map, debounce, tap, buffer, filter, mapTo, sample, mergeMap, flatMap, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


// doubleClick();
// clickVsDrag();
httpExample();

/// Double click example 
function doubleClick() {
    //create observable that emits click events
    const source$ = fromEvent(document, 'click');
    const example = source$.pipe(map(event => `Event time: ${event.timeStamp}`), buffer(source$.pipe(debounce(() => timer(250)))), tap(arr => console.log('clicks', arr.length)), filter(arr => arr.length > 1));
    //output (example): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe(val => console.log('double click occur', val));
}


// Identify drag and drop scenario
function clickVsDrag() {
    const listener = merge(
        fromEvent(document, 'mousedown').pipe(mapTo(false)), 
        fromEvent(document, 'mousemove').pipe(mapTo(true))
    )
        .pipe(
            sample(fromEvent(document, 'mouseup')),
        )
        .subscribe(isDragging => {
            console.log('Mouse was dragging?', isDragging);
        });
}

function httpExample(){
    const listener = fromEvent(document, 'mousedown').pipe(mapTo(false));
    listener.pipe(
        mergeMap( () => {
            return  ajax('http://localhost:3000/list').pipe(
                map(data => data.response)
            );
        }),
        // mergeMap((items) => items ),
    ).subscribe( (data) => {
        console.log(data);
        
    })
}