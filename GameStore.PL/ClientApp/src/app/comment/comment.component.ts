import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    CurrentUser: UserModel = JSON.parse(localStorage.getItem('user'));
    @Input() comment!: CommentModel;
    @Input() activeComment!: ActiveCommentInterface | null;
    @Input() replies!: CommentModel[];
    @Input() currentUserId!: number;
    @Input() parentCommentId!: number | 0;

    @Output()
    setActiveComment = new EventEmitter<ActiveCommentInterface | null>();
    @Output()
    deleteComment = new EventEmitter<string>();
    @Output()
    addComment = new EventEmitter<{ text: string; parentId: number | 0 }>();
    @Output()
    updateComment = new EventEmitter<{ text: string; commentId: number }>();

    canReply: boolean = true;
    canEdit: boolean = true;
    canDelete: boolean = true;
    undoDeleting: boolean = false;
    loggedIn() {
        if (localStorage.getItem('userStatus') === 'success') {
            return true;
        }
    }
    activeCommentType = ActiveCommentTypeEnum;
    replyId: number | 0 = 0;

    ngOnInit(): void {
        
        this.replyId = this.parentCommentId ? this.parentCommentId : this.comment.id;

    }


    isReplying(): boolean {
        if (!this.activeComment) {
            return false;
        }
        return (
            this.activeComment.id === this.comment.id &&
            this.activeComment.type === this.activeCommentType.replying
        );
    }

    isEditing(): boolean {
        if (!this.activeComment) {
            return false;
        }
        return (
            this.activeComment.id === this.comment.id &&
            this.activeComment.type === 'editing'
        );
    }
    isDeleting(): boolean {
        if (!this.activeComment) {
            return false;
        }
        this.undoDeleting = true;
        return (
            this.activeComment.id === this.comment.id &&
            this.activeComment.type === 'deleting'
        );
    }

    unDo() {
        this.undoDeleting = false;
    }
    

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
    deleting = 'deleting'


}
interface ActiveCommentInterface {
    id: number;
    type: ActiveCommentTypeEnum;
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
