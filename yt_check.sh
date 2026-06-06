cd /home/team/shared/raw
pip3 install yt-dlp --break-system-packages 2>/dev/null
yt-dlp --print "%(title)s|||%(duration)s|||%(view_count)s" "https://www.youtube.com/watch?v=UgHKb_7884o" 2>/dev/null > /home/team/shared/yt_info.txt
echo "DONE"
cat /home/team/shared/yt_info.txt