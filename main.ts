radio.onReceivedValue(function (name, value) {
    if (name == "start") {
        basic.showIcon(IconNames.SmallHeart)
        time1 = value
        receiver = 1
        sender = 0
    } else if (name == "end") {
        time2 = value
        timediff = time2 - time1
        speed = distance / (timediff / 1000) * 0.681818
        basic.showNumber(speed)
    } else if (name == "init") {
        initialized = 1
    }
})
let receiver = 0
let sender = 0
let speed = 0
let distance = 0
let timediff = 0
let time2 = 0
let time1 = 0
let initialized = 0
initialized = 0
time1 = 0
time2 = 0
timediff = 0
distance = 10
speed = 0
let current_light = 0
let prior_light = 0
sender = 0
receiver = 0
radio.setGroup(1)
radio.sendValue("init", 0)
basic.forever(function () {
    current_light = input.lightLevel()
    if (current_light - prior_light < -10) {
        if (time1 == 0) {
            basic.showIcon(IconNames.Heart)
            time1 = control.millis()
            receiver = 0
            sender = 1
            radio.sendValue("start", time1)
        } else if (time2 == 0 && receiver == 1) {
            basic.showIcon(IconNames.Yes)
            time2 = control.millis()
            radio.sendValue("end", time2)
        }
    }
    prior_light = current_light
})
