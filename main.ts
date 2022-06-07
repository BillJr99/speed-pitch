radio.onReceivedValue(function (name, value) {
    let initialized: number;
if (name == "start") {
        time1 = value
    } else if (name == "end") {
        time2 = value
        timediff = time2 - time1
        speed = 0
        basic.showNumber(distance / (timediff / 1000))
    } else if (name == "init") {
        initialized = 1
    }
})
let prior_light = 0
let current_light = 0
let speed = 0
let distance = 0
let timediff = 0
let time2 = 0
let time1 = 0
let initialized2 = 0
time1 = 0
time2 = 0
timediff = 0
distance = 10
speed = 0
radio.setGroup(1)
radio.sendValue("init", 0)
basic.forever(function () {
    current_light = input.lightLevel()
    if (current_light - prior_light < -10) {
        if (time1 == 0) {
            basic.showIcon(IconNames.Heart)
            time1 = control.millis()
            radio.sendValue("start", time1)
        } else if (time2 == 0) {
            basic.showIcon(IconNames.Yes)
            time2 = control.millis()
            radio.sendValue("end", time2)
        }
    }
    prior_light = current_light
})
