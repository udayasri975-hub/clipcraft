cd /home/team/shared/raw
pip3 install yt-dlp --break-system-packages 2>/dev/null
yt-dlp --print "%(title)s | %(duration)s sec" "https://www.youtube.com/watch?v=UgHKb_7884o"