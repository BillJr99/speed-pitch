def on_received_value(name, value):
    global time1, receiver, sender, time2, timediff, speed, initialized
    if name == "start":
        time1 = value
        receiver = 1
        sender = 0
    elif name == "end":
        time2 = value
        timediff = time2 - time1
        speed = 0
        basic.show_number(distance / (timediff / 1000) * 0.681818)
    elif name == "init":
        initialized = 1
radio.on_received_value(on_received_value)

prior_light = 0
current_light = 0
initialized = 0
receiver = 0
sender = 0
speed = 0
distance = 0
timediff = 0
time2 = 0
time1 = 0
initialized2 = 0
time1 = 0
time2 = 0
timediff = 0
distance = 10
speed = 0
sender = 0
receiver = 0
radio.set_group(1)
radio.send_value("init", 0)

def on_forever():
    global current_light, time1, receiver, sender, time2, prior_light
    current_light = input.light_level()
    if current_light - prior_light < -10:
        if time1 == 0:
            basic.show_icon(IconNames.HEART)
            time1 = control.millis()
            receiver = 0
            sender = 0
            radio.send_value("start", time1)
        elif time2 == 0 and receiver == 0:
            basic.show_icon(IconNames.YES)
            time2 = control.millis()
            radio.send_value("end", time2)
    prior_light = current_light
basic.forever(on_forever)
