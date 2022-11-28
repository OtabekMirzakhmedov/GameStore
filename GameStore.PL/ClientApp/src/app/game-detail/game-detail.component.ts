
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
    public game: GameModel;
    public param: any;
    CurrentUser: UserModel = JSON.parse(localStorage.getItem('user'));
    comments: CommentModel[] = [];
    activeComment: ActiveCommentInterface | null = null;
    public browserRefresh: boolean;

    reload: boolean = false;
    status: string;
    postedComment: CommentModel = {
        id: 0,
        text: '',
        parentCommentId: 0,
        createdTime: undefined,
        userId: 0,
        gameId: 0,
        userImageUrl: undefined,
        userFirstName: undefined,
        userLastName: undefined
    };

    constructor(private route: ActivatedRoute, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private formBuilder: FormBuilder,) {

        route.params.subscribe(p => {
            this.param = p["id"];
            this.http.get<GameModel>(baseUrl + 'api/Game/games/' + this.param).subscribe(response => {
                this.game = response;
                console.log(response);
            }
            );
            this.http.get<CommentModel[]>(this.baseUrl + 'api/Comment/games/' + this.param).subscribe(r => {
                this.comments = r;
                console.log(r);
                this.comments.sort(
                    (a, b) =>
                        -1*(new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
                );
            })
            console.log(this.comments);
        }); 
    }
    loggedIn() {
        if (localStorage.getItem('userStatus') === 'success') {
            return true;
        }
    }
    ngOnInit() {
        if (window.performance.getEntriesByType("navigation")[0].toJSON()['type'] === 'reload') {
            this.reload = true;
        }        
    }


    getRootComments(): CommentModel[] {
        return this.comments.filter((comment) => comment.parentCommentId === 0);
    }

    updateComment({
        text,
        commentId,
    }: {
        text: string;
        commentId: number;
    }): void {
        console.log(text, commentId);
        this.postedComment.text = text;
        this.postedComment.createdTime = new Date();
        this.postedComment.gameId = this.game.id;
        this.postedComment.id = commentId;

        this.http.put<CommentModel>(this.baseUrl + 'api/Comment/' + commentId, this.postedComment).subscribe();
        
        this.comments.find(item => item.id === commentId).text = text;
        this.comments.find(item => item.id === commentId).createdTime = new Date();
        this.activeComment = null;
       
    }

    deleteComment(commentId: number): void {
        console.log(commentId);
        if (this.reload) {
            this.http.delete(this.baseUrl + 'api/Comment/' + commentId).subscribe(() => this.status = 'Delete successful');
            this.reload = false;
        }
    }

    setActiveComment(activeComment: ActiveCommentInterface | null): void {
        this.activeComment = activeComment;
    }

    addComment({
        text,
        parentCommentId,
    }: {
        text: string;
        parentCommentId: number| 0;
        }): void {

        this.postedComment.userFirstName = this.CurrentUser.firstName;
        this.postedComment.userImageUrl = this.CurrentUser.imageUrl;
        this.postedComment.userLastName = this.CurrentUser.lastName;
        this.postedComment.userId = this.CurrentUser.id;
        this.postedComment.text = text;
        this.postedComment.parentCommentId = parentCommentId;
        this.postedComment.createdTime = new Date();
        this.postedComment.gameId = this.game.id;
       /* console.log(this.postedComment);*/
      

        this.http.post<CommentModel>(this.baseUrl + 'api/Comment/', this.postedComment).subscribe((res) => {
            this.comments.unshift(res);
            console.log(res);
        });
        this.activeComment = null;
       
        //console.log(text, parentCommentId)
        /*window.location.reload();*/
        /*this.reload = false;*/
    }

    getReplies(commentId: number): CommentModel[] {
        return this.comments
            .filter((comment) => comment.parentCommentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
            );
    }
}

interface GameModel {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    genreName: string

}

interface UserModel {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    imageUrl: string
}

interface CommentReceiveModel {
    id: number,
    text: string,
    parentId: number;
    createdTime: Date,
    userId: number,
    gameId: number,
    userImageUrl: string,
    userFirstName: string,
    userLastName: string
}

interface CommentModel {
    id: number;
    text: string,
    parentCommentId: number;
    createdTime: Date,
    userId: number,
    gameId: number,
    userImageUrl: string,
    userFirstName: string,
    userLastName: string
}

 enum ActiveCommentTypeEnum {
  replying = 'replying',
  editing = 'editing',
}

interface ActiveCommentInterface {
    id: number;
    type: ActiveCommentTypeEnum;
}
