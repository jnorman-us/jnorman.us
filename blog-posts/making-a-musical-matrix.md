Making a Musical Matrix
Assembling an 15x10 LED matrix and powering it from a Raspberry Pi
1667012326

I like listening to music since it helps me get into the mood for studying and working on code. I also can't help but admire good LED setups, being from FRC Team 624, a robotics team famous for their flashy lights.

![Clawbot at the CRHS Blackout Pep-rally](https://photos.smugmug.com/2019-Destination-Deep-Space/CRHS-Pep-Rally-11-8-19/i-JdF5s9J/0/dccbaad1/X3/IMG_4025-X3.jpg)
> Disclaimer: Clawbot was blinged out after I graduated from the team, but I'm including it because it's the most extravagant

So during my freshman year in college, I set out to create the *Musical Matrix*: a 15x10 LED matrix that animates according to the music being played.

## Design and Fabrication
For the first step, I designed a wooden frame in SolidWorks so that a strip of 150 LEDs could be cut up and laid in strips across the board. There would also be wooden strips separating each LED so they could project onto a piece of frosted acrylic without mixing. Finally, there would be space behind the LEDs for wiring and electronics, all covered once hung on the wall.

I reached out to the machine shop at UT Dallas and they told me they had a laser cutter, I just had to supply the wood for cutting. I sent them the files and headed over to Home Depot... but I accidentally gave them a piece of wood that was 1/16 inches too thick. Having just run through my budget, I tried to assemble the pieces together even though the tolerances were designed tight to ensure a snug fit.

![The pieces of wood, freshly laser cut](https://github.com/jnorman-us/musicalmatrix/raw/main/images/laser-print.jpg)
> The pieces of wood, freshly laser cut

To make do with the poorly fitting wood pieces, I decided to scrap the frosted acrylic idea since weaving the separator pieces would have required too much delicate modification. Anyways, the frosted acrylic was a reach goal since that stuff is really expensive. I assembled it in my dorm room and wove the 10 rows of LED strip into the board.

![LED Matrix assembled](https://github.com/jnorman-us/musicalmatrix/raw/main/images/leds-assembled.jpg)
> LED Matrix assembled. Right around this time I got really into Overwatch.

Once I soldered the LED strips in series, I tested it out and got a simple rainbow test to run. Looks pretty.

![Rainbow Test](https://github.com/jnorman-us/musicalmatrix/raw/main/images/led-check.jpg)
> Rainbow test, looks pretty

## Programming the Sound Recognition
The summer before college, I got a Raspberry Pi for hosting a MySQL server and boring stuff I could do on any other Linux machine. This project was my first to take advantage of the cool hardware available on the Pi, so I was excited to try hardware programming with Python. I decided to setup a microphone on the Raspberry Pi to listen for music, then transform it into a breakdown of the frequencies being played.

For a given sound signal, you're not seeing the frequencies being played or the dB of the sound. The only data that makes sense to a speaker is a stream of sampled amplitudes of audio, aka the Y-axis on a waveform graph. And this waveform graph is the combination of several different frequencies of sound being played at once as well as the imperfection of digitizing that signal to a discrete sample rate.

Breaking down this signal into its frequency components can be done by using the [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform). This sounded feasible to me, so I went ahead trying to code the Fourier Transform in Python. But either my code was too slow, or the Raspberry Pi couldn't handle the problem, because I got stuck trying to decrease the sample rate to save on performance, or dealing with inaccurate results from the decreased sample rate. 

Eventually I put the project on the back burner to deal with exam season.

### Open Source Code to the Rescue
A couple of months later while trying to eke out my Linux configuration, I stumbled across the i3 community. I can appreciate a good tiling window manager, and for a few months I got into keyboard shortcuts and making my computer user unfriendly. Something the community was really into was posting beautiful screenshots of their configurations, and I noticed a couple with frequency breakdown graphs. How were they all doing this in their terminals?

![r/unixporn Screenshot](https://preview.redd.it/tqmdm33zpwg41.png?auto=webp&s=e860f05af3bb2abb8123f2c71d6c117d667adae9)
> Look, a terminal with the frequency breakdown graph, bottom left!

I found the name of the library they were using to generate those beautiful frequency breakdowns: [Cava](https://github.com/karlstav/cava). It did all of the Fourier Transforms. It was compatible with many distributions of linux. And it could tap into any audio source on my Desktop, so I no longer had to use a microphone on the Raspberry Pi.

And also, I found a way to send data Cava on my desktop to the Raspberry Pi. 

	unbuffer cava -p PATH_TO_YOUR_CAVA.conf | ssh pi@IP_OF_RASPBERRYPI sudo python PATH_TO_LEDS.py
> I'm just piping the stdout of Cava to stream over SSH to the stdin of my Python script, running on my Raspberry Pi

Now the Raspberry Pi doesn't have to perform that expensive Fourier Transform because that computation is done on the Desktop. All that's left is for my Python script to turn the streamed frequency data into LED output. Here's the Python code:

```Python
while True:
	try:
		levels = sys.stdin.readline()[:-2].split(";")[:-1]
		levels = map(int, levels)

		volume = sum(levels) / CHANNELS
		volume = int(float(volume) / 1000 * 255)

		for i in range(0, CHANNELS, 1):
			fill_channel(strip, i, levels[i], volume)
		
		strip.setBrightness(volume)
		strip.show()
	except Exception as e:
		print e
```

> The strip variable is an initialized instance of an LED strip, from the Adafruit Neopixel library.

## Results
![Musical Matrix in Action](https://github.com/jnorman-us/musicalmatrix/raw/main/images/demo.gif)
> The Musical Matrix in action, playing Mercy by Kanye West

Thanks for reading the source code for this repo is [here](https://github.com/jnorman-us/musicalmatrix).
> Unfortunately, one of the soldered connections on the Musical Matrix broke and I had to leave it when I moved to Brooklyn. I look forward to going back to my parents' house and fixing it over Thanksgiving break. Maybe I'll go for that frosted acrylic now that I have more money.
