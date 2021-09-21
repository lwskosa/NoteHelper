# Introduction

The purpose of this project was originally to help myself with taking notes for classes that uses [Kanopy](http://kanopy.com).

It creates a user interface that aloows taking notes and timestamps easily. 

*If you are done using it, you can reload the page or navigate away - it will also clear it from memory.*


It started out as a simple, 1 button feature, which then expanded to what you see now. I have decided to make it available, in hopes that it would help others just as much as it helped me!

# How to Start

1. Copy the code you see in NoteUtility.js

2. Navitage to the **Desktop version** of [Kanopy](http://kanopy.com)

3. Open the Movie Title you want to watch

4. Once the page fully loaded, press **F12** or **Ctrl(Cmd)+Shift+I** to open Developer Tools

5. Navigate to **Console** tab. If it is not visiBle, you might need to click the **»** icon to the right and select it from the list, you can press the **Trashcan** icon left to **Filter Input**  to clear things up

6. Paste it into the Console, just after the big **»**

7. Press enter - this will load the Utility

8. You should see the controls appear below the Video Player

9. Press **F12** or **Ctrl(Cmd)+Shift+I** again to close the Developer Tools window
----
# How to Use



## Marker Control


### **Scene Start**

Sets the Start time for a Clip/Scene

### **Scene End**
Sets the End time for a Clip/Scene

### **Timestamp**
Sets a single-point marker using the current time

----

## Copy to Clipboard
*Make sure you do not have anything important on Clipboard before using it!*

### **Clip**
Copies the currently selected range onto clipboard

### **Timestamp**
Copies the currently selected timestamp onto clipboard

----
## Bookmark Control
This is where you can take Notes for various timestamps of the movie. When you are using the Copy function, 

### **Copy**
*Make sure you do not have any important information on your Clipboard!*

Similar to the Copy to Clipboard function, but it copies all of your current notes to Clipboard

### **Save**
saves your current note you took so far.  If you close the the video, refresh and load the Utility again, you will get your notes back 

### **Undo** 
Double-clicking this button will remove your last entered Note

### **Delete** 
Double-clicking this will delete all your notes, you can start clean. Will only delete data for current movie

**Be careful, as you cannot undo this!**

### **Clip (Marker)** 
Adds a Note based on your Start and End time you set - can be useful to note various scenes

### **Timestamp (Marker)** 
Adds a Note based on your currently set Marker - can be useful to taje a note of specific events in the Movie

### **Timestamp (Now)**
Adds a Note based on *current* time - Marker will always point to the specific time you Maerked, this will take the current timestamp.

----

# DISCLAIMER

**The Utility does not have any telemetry. It does not track or report any information - anonymous or otherwise**

Work-In-Progress - functions, layout, etc might change as/if new features gets added

Uses LocalStorage to save your progress

Once saved, your Notes (data) will be present in LocalStorage, but will not get accessed until you load the Utility

# FAQ

## I found a bug, how do I report it?
You can send your findings either through GitHub (preferred), or you can send me an email at: 

lajos.kosa @ g.austincc.edu (remove space around '@')

Please be descriptive as possible. 'It just wont work' is not helpful.

You can use the template:

    Browser: <your browser's name>​
    Title:   <headline of the issue you are having>​
    Steps:   <steps to reproduce (what lead to the issue?)>​