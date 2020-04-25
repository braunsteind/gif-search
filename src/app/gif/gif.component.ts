import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { stringify } from 'querystring';

@Component({
	selector: 'app-gif',
	templateUrl: './gif.component.html',
	styleUrls: ['./gif.component.css']
})

export class GifComponent implements OnInit {

	searchText: string = '';
	readonly configUrl = 'https://api.giphy.com/v1/gifs/search?api_key=znwTvIwctHMcbPaRlDogJC08AWldIalk&q=';
	gifs: any[];

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
	}

	submit(event: any) {
		document.querySelector("input").style.cssText = "margin-top: 1%";
		document.querySelector("hr").style.cssText = "visibility: visible;";
		this.searchText = event.target.text.value;
		this.http.get(this.configUrl + this.searchText).subscribe(element => {
			this.gifs = element["data"];
			console.log(this.gifs);
		});
	}

	async imgClick(index: number) {
		var gifUrl: string = this.createUrl(index);
		const res = await fetch(gifUrl);
		const blob = await res.blob();
		var fileName = this.gifs[index]["title"] + ".gif";
		saveAs(blob, fileName);
	}

	private createUrl(index: number) {
		var gifUrl: string = this.gifs[index]["images"]["original"]["url"];
		gifUrl = gifUrl.split("?")[0];
		gifUrl = gifUrl.slice(gifUrl.search("giphy"));
		gifUrl = "http://i." + gifUrl;
		return gifUrl;
	}
}