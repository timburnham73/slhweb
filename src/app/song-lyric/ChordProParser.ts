/**
 * Created by tim_burnham on 9/25/16.
 */
export class ChordProParser{
  private chordProString: string;
  constructor(chordProString: string){
    this.chordProString = chordProString;
  }

  parseChordPro(){
    //var lyricsSplit = song.lyrics.split('\n');
    //this.parsedSong = '<h2>' + lyricsSplit[0] + '</h2>';
    return '<h2>This is a test</h2>'
  }
}