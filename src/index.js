import { fromEvent, timer, merge } from 'rxjs';
import  { map, debounce, tap, buffer, filter, mapTo, sample } from 'rxjs/operators';



// doubleClick();
clickVsDrag();





/// Double click example 
function doubleClick() {
    
    
    //create observable that emits click events
    const source$ = fromEvent(document, 'click');
    const example = source$.pipe(map(event => `Event time: ${event.timeStamp}`), buffer(source$.pipe(debounce(() => timer(250)))), tap(arr => console.log('clicks', arr.length)), filter(arr => arr.length > 1));
    //output (example): 'Event time: 7276.390000000001'
    const subscribe = example.subscribe(val => console.log('double click occur', val));
}

function clickVsDrag() {
    const listener = merge(
        fromEvent(document, 'mousedown').pipe(mapTo(false)), 
        fromEvent(document, 'mousemove').pipe(mapTo(true))
    )
        .pipe(
            sample(fromEvent(document, 'mouseup')),
        )
        .subscribe(isDragging => {
            console.log('Were you dragging?', isDragging);
        });
}